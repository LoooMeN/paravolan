<?php

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    http_response_code(404);
    return;
}
header('Content-Type: application/json');

$name = $_POST['Name'];
$email = $_POST['Email'];
$message = $_POST['Message'];

if (!$name || !$email || !$message) {
    echo json_encode(['error' => 'Missing data']);
    return;
}

$subject = "Submitted a new form!";
$headers = "From: no-reply@paravolanua.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// HTML Message with sender's name and message
$htmlMessage = "
<html>
<head>
    <title>$subject</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        h2 {
            color: #4A90E2;
            border-bottom: 2px solid #f4f4f4;
            padding-bottom: 10px;
        }
        p {
            color: #555555;
            line-height: 1.6;
            font-size: 16px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #999999;
            text-align: center;
        }
        .message {
            background-color: #f9f9f9;
            border-left: 5px solid #4A90E2;
            padding: 15px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class='container'>
        <h2>New Message Submission</h2>
        <p><strong>Sender Name:</strong> $name</p>
        <p><strong>Sender Email:</strong> $email</p>
        <div class='message'>
            <strong>Sender Message:</strong><br>
            $message
        </div>
        <div class='footer'>
            <p>This email was generated automatically. Please do not reply.</p>
        </div>
    </div>
</body>
</html>
";

// Send HTML email
if (mail("info@paravolanua.com", $subject, $htmlMessage, $headers)) {
    echo json_encode(['value' => 'Email sent successfully!']);
} else {
    echo json_encode(['value' => 'Failed to send email.']);
}



