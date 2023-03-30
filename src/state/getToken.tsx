export  function getToken(){
    return fetch('https://alpha.preprod.fxtrt.io:443/core/api/v1/aaa/auth/client-credentials', {
        method: 'POST',
        headers: {
            'X-COREOS-REQUEST-ID': '123',
            'Content-Type': 'application/json'
        },
  // body: '{\n  "clientId":"2r5hDxz6J2W5a0wMbJFpjwkg6fOGj8C2",\n    "clientSecret":"J7mHrEaq6usqUmPIM6ns94o47Ksw2c5MXbbIMeOKxu-48rbR-cEVjlMj_oF8RwrR",\n  "audience": "platform:app:coreos"\n}',
        body: JSON.stringify({
            'clientId': '2r5hDxz6J2W5a0wMbJFpjwkg6fOGj8C2',
            'clientSecret': 'J7mHrEaq6usqUmPIM6ns94o47Ksw2c5MXbbIMeOKxu-48rbR-cEVjlMj_oF8RwrR',
            'audience': 'platform:app:coreos'
        })
    });
}