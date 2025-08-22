<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Merci pour votre message</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #eee;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #007bff;
        }
        .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bonjour {{ $firstname }} {{ $lastname }},</h1>

        <p>Merci pour votre message ! J'ai bien reçu votre demande et reviendrai vers vous rapidement.</p>

        <p>Je vous souhaite une excellente journée !</p>

        <div class="footer">
            &copy; {{ date('Y') }} {{ \App\Models\User::first()->firstname }} {{ \App\Models\User::first()->lastname }}. Tous droits réservés.
        </div>
    </div>
</body>
</html>
