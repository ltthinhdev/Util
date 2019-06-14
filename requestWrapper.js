const DELAY_TIME = 500;

module.exports = (() => {
    let pendingProcess;

    let pending;
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
        prevRequestTime = (new Date()).getTime();
        pending = {
            successFunc,
            requestTime: prevRequestTime
        };
        pendingRequest = requestFunc;
        setTimeout(() => {
            if(pendingRequest) {
                if(prevRequestTime === pending.requestTime) {
                    pendingRequest().then(() => {
                        if(pendding) {
                            pendding.successFunc();
                            pending = null;
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