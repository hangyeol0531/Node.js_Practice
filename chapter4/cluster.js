const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
//마스터프로세스 CPU개수 만큼 워커 프로세를 만듬 (워커 프로세스 제어)
//워커프로세스가 실질적인 일을함
if(cluster.isMaster){
    console.log(`마스터 프로세스 아이디 ${process.pid}`);
    //CPU개수만큼 생산
    for(let i = 0; i< numCPUs; i++){
        cluster.fork();
    }
    //워커가 종료되었을때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`)
        cluster.fork()
    });
}else{
    //워커들이 포트에서 머기
    http.createServer((req, res) =>{
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(()=>{
            process.exit(1);
        }, 1000);
    }).listen(8085);

    console.log(`${process.pid}번 워커 실행`);
}