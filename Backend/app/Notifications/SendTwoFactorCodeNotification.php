<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendTwoFactorCodeNotification extends Notification
{
    use Queueable;

    protected string $code;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $code)
    {
        // On récupère le code OTP généré par le contrôleur
        $this->code = $code;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('EDUSMART - Votre code de vérification sécurisé')
            ->greeting('Bonjour ' . $notifiable->nom . ',')
            ->line('Une tentative de connexion à votre espace EDUSMART a été détectée.')
            ->line('Veuillez utiliser le code de validation à double facteur (OTP) suivant pour finaliser votre authentification :')
            ->line('**' . $this->code . '**')
            ->line('Ce code est strictement confidentiel et expirera dans 15 minutes.')
            ->line('Si vous n\'êtes pas à l\'origine de cette demande, veuillez ignorer ce message de sécurité.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'two_factor_code' => $this->code,
        ];
    }
}