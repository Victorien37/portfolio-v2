<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Message Portfolio</title>
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
        p {
            margin-bottom: 10px;
        }
        .footer {
            font-size: 12px;
            color: #888;
            margin-top: 20px;
            text-align: center;
        }
        .message-box {
            border-left: 3px solid #007bff;
            padding-left: 10px;
            margin: 10px 0;
            background-color: #f1faff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Nouveau message depuis le Portfolio</h1>

        <p><strong>Nom :</strong> {{ $firstname }} {{ $lastname }}</p>
        <p><strong>Email :</strong> {{ $email }}</p>

        <h3>Message :</h3>
        <div class="message-box">
            {!! nl2br(e($message)) !!}
        </div>

        <div class="footer">
            &copy; {{ date('Y') }} {{ \App\Models\User::first()->firstname }} {{ \App\Models\User::first()->lastname }}. Tous droits réservés.
        </div>
    </div>
</body>
</html>
