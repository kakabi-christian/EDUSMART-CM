<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Models\UtilisateurModel;
use App\Notifications\SendTwoFactorCodeNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // ─────────────────────────────────────────────────────────────────────────
    // AUTHENTIFICATION & PROFIL
    // ─────────────────────────────────────────────────────────────────────────

    public function login(AuthRequest $request): JsonResponse
    {
        $login = $request->input('login');
        $user = UtilisateurModel::where('email', $login)
            ->orWhere('telephone', $login)
            ->orWhere('matricule', $login)
            ->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Identifiant ou mot de passe incorrect.'], 401);
        }

        if ($request->has('two_factor_code')) {
            if ($user->two_factor_code !== $request->input('two_factor_code') || now()->isAfter($user->two_factor_expires_at)) {
                return response()->json(['success' => false, 'message' => 'Le code de vérification est invalide ou a expiré.'], 401);
            }

            $user->resetTwoFactorCode();
            $token = $user->createToken('auth_token_edusmart')->plainTextToken;

            return response()->json(['success' => true, 'access_token' => $token, 'user' => $user], 200);
        }

        if (!Hash::check($request->input('password'), $user->password)) {
            return response()->json(['success' => false, 'message' => 'Identifiant ou mot de passe incorrect.'], 401);
        }

        $user->generateTwoFactorCode();
        $user->notify(new SendTwoFactorCodeNotification($user->two_factor_code));

        return response()->json(['success' => true, 'step' => 2, 'message' => 'Code OTP envoyé.'], 200);
    }

    public function profile(Request $request): JsonResponse
    {
        return response()->json(['success' => true, 'user' => $request->user()], 200);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|string|max:255',
            'prenom' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:utilisateurs,email,' . $user->id,
            'telephone' => 'sometimes|string|max:20',
        ]);

        if ($validator->fails()) return response()->json(['success' => false, 'errors' => $validator->errors()], 422);

        $user->update($request->only(['nom', 'prenom', 'email', 'telephone']));
        return response()->json(['success' => true, 'user' => $user], 200);
    }

    public function changePassword(Request $request): JsonResponse
    {
        $request->validate(['current_password' => 'required', 'new_password' => 'required|min:8|confirmed']);
        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Ancien mot de passe incorrect.'], 401);
        }

        $user->update(['password' => Hash::make($request->new_password)]);
        return response()->json(['success' => true, 'message' => 'Mot de passe mis à jour.'], 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true], 200);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GESTION MEMBRES GROUPE MINESEC
    // ─────────────────────────────────────────────────────────────────────────

    public function indexMembers(Request $request): JsonResponse
    {
        if ($request->user()->role !== 'minesec') return response()->json(['message' => 'Accès refusé.'], 403);

        $members = UtilisateurModel::where('role', 'minesec')->paginate(10);
        return response()->json(['success' => true, 'data' => $members], 200);
    }

 public function createMember(Request $request): JsonResponse
{
    if ($request->user()->role !== 'minesec') return response()->json(['message' => 'Accès refusé.'], 403);

    $request->validate([
        'nom' => 'required|string',
        'email' => 'required|email|unique:utilisateurs,email',
    ]);

    $tempPassword = Str::random(10);
    
    // 1. Le membre est créé avec le matricule en BDD
    $member = UtilisateurModel::create([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'email' => $request->email,
        'telephone' => $request->telephone,
        'role' => 'minesec',
        'password' => Hash::make($tempPassword),
        'matricule' => 'MINESECUSER-' . strtoupper(Str::random(6)),
    ]);

    // 2. CORRECTION : On renvoie l'objet $member dans la réponse
    return response()->json([
        'success' => true, 
        'message' => 'Membre créé.', 
        'temp_password' => $tempPassword,
        'member' => $member // C'est ici que le frontend récupérera le matricule
    ], 201);
}

    public function deleteMember(Request $request, $id): JsonResponse
    {
        if ($request->user()->role !== 'minesec') return response()->json(['message' => 'Accès refusé.'], 403);
        
        $member = UtilisateurModel::where('role', 'minesec')->findOrFail($id);
        $member->delete();

        return response()->json(['success' => true, 'message' => 'Membre supprimé.'], 200);
    }
}