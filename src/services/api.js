const getData = (url, onSuccess, onError) => {
    fetch(url)
        .then((response) => {
            if(response.ok) {
            return response;
            }
            throw new Error('Не удалось загрузить фотографии. Попробуйте перезагрузить страницу');
        })
        .then((response) => response.json())
        .then((data) => {
            onSuccess(data);
        })
        .catch((err) => {
            onError(err);
        });
    };
  
  const sendData = (url, onPositiveResult, onFailResult, body) => {
    fetch(
        url,
        {
            method: 'POST',
            body,
        },
        )
        .then((response) => {
            if (response.ok) {
                return response.text()                
            } else {
                throw new Error();
            }
        })
        .then((data) => onPositiveResult(data))
        .catch((err) => {
            onFailResult(err);
        });
    };
  
  export {getData, sendData};