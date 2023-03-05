<?php
header('Content-Type: application/json');

$dir = './src/assets/5/';
$files = array_diff(scandir($dir), array('..', '.'));

$fileList = array_map(function($file) use ($dir) {
  return [
    'name' => $file,
    'path' => $dir . '/' . $file
  ];
}, $files);

echo json_encode($fileList);