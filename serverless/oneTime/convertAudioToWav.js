var ffmpeg = require('fluent-ffmpeg');
var track = '/Users/Chen/百度云同步盘/Startup/Clevo/联动数据/录音/642/20170623121310_642_15930803468_601.mp3';//your path to source file

ffmpeg(track)
    .toFormat('wav')
    .on('error', function (err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('progress', function (progress) {
      // console.log(JSON.stringify(progress));
      console.log('Processing: ' + progress.targetSize + ' KB converted');
    })
    .on('end', function () {
      console.log('Processing finished !');
    })
    .save('./hello.wav');//path where you want to save your file

