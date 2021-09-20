<?php
# deploy.php
$log_file = __DIR__ . "/../../log/deploy.log";
// INIファイル読み込み
$arrayIniFile = parse_ini_file(__DIR__ . "/../../deploy.ini", true);
// secretキーのチェック
if(!isset($_SERVER['HTTP_X_HUB_SIGNATURE']) &&
   !($_SERVER['HTTP_X_HUB_SIGNATURE'] === sha1($arrayIniFile['sercret_key']))){
    file_put_contents($log_file, date("Y-m-d H:i:s")."\t".'secret key error'.PHP_EOL, FILE_APPEND);
    die();
}
$payload = json_decode(file_get_contents('php://input'), true);
//payloadからpushされたリポジトリ名を取得し、iniファイルと突き合わせpullコマンドを発行する
foreach($arrayIniFile['deploy_setting'] as $repository_name => $local_repository_path){
    if($payload['repository']['name'] != $repository_name) continue;
    $command = "cd {$local_repository_path} && git --git-dir=.git pull 2>&1";
    exec($command, $output, $return_var);
    file_put_contents($log_file, date("Y-m-d H:i:s")."\t".$command."\t".var_export($output).PHP_EOL, FILE_APPEND);
}