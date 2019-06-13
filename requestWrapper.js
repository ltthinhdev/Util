const DELAY_TIME = 500;

module.exports = (() => {
    let pendingProcess;

    let pendingRequest;
    let prevRequestTime = (new Date()).getTime();

    let callRequest = (request, successFunc) => {
        pendingProcess = successFunc;
        request.then(() => {
            if(pendingProcess) {
                pendingProcess();
                pendingProcess = null;
            }
        })
    }

    let callReduceRequest = (requestFunc, successFunc) => {
        pendingProcess = successFunc;
        pendingRequest = requestFunc;
        prevRequestTime = (new Date()).getTime();
        setTimeout(() => {
            if(pendingRequest) {
                let nowTime = (new Date()).getTime();
                if(nowTime - prevRequestTime >= DELAY_TIME) {
                    pendingRequest().then(() => {
                        if(pendingProcess) {
                            pendingProcess();
                            pendingProcess = null;
                        }
                    });
                    pendingRequest = null;
                }
            }
        }, DELAY_TIME);
    }

    return { 
        callRequest: callRequest,
        callReduceRequest: callReduceRequest
    }
})()