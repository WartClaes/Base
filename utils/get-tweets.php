<?php
    session_start();
    require_once("twitteroauth/twitteroauth/twitteroauth.php"); //Path to twitteroauth library

    $twitteruser = $_GET["twitteruser"];
    $notweets = 30;
    $consumerkey = "CAWOtFsWJTUpU80yVfcyw";
    $consumersecret = "RuD98jLHvEphBsVgfAXADbHSb84XdCTkoZoMnjbLHEI";
    $accesstoken = "64705577-Rof8MaI9Akgwuxhdrt6bJcAEfcPrwTR2VCrnxGAJU";
    $accesstokensecret = "doWGfnx7jpq061in469yedYlcbW9DGaKgm4vaGYi8";

    function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
        $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
        return $connection;
    }

    $connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);

    $tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);

    echo json_encode($tweets);
?>