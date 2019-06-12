module.exports = (() => {
    let pendingProcess;

    return { 
        callRequest: (request, successFunc) => {
            pendingProcess = successFunc;
            request.then(() => {
                if(pendingProcess) {
                    pendingProcess();
                    pendingProcess = null;
                }
            })
        }
    }
})()

//        Hướng dẫn sử dụng:

//        import RequestWraper from '....';

//        //request là hàm gọi api (phần phía trước "then")
//        //successFunc là hàm sử lý sau khi api callback (phần bên trong "then")
//        RequestWraper.callRequest(request, successFunc);