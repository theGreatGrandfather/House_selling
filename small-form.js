const refs = {
    backdrop: document.querySelector('.steps__form-backdrop'),
    
    modalInput: document.querySelectorAll('.steps__input'),
    modalFormBtn: document.querySelector('.steps__btn'),
    modalCloseBtn: document.querySelector('.steps__form-close-btn'),
    body: document.querySelector('body'),
    clientName: document.querySelector('.modal__thanks-name'),
    
}
 

document.addEventListener('DOMContentLoaded', function () {
    const modalForm = document.querySelector('.steps__form');


    modalForm.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(modalForm);
        let formData = new FormData(modalForm);

        if (formData) {
        }


        formData.forEach((x, y) => {
            console.log(x);
            console.log(y);
        
        });


        if (error === 0) {
            onModalFormBtnClick();
            let messageToTg = `<b>New small action</b>\n`;
            function sendMessage() {
       
            
            
        
                for (let entry of formData.entries()) {
                    console.log(entry);

                    if (entry[1] != '') {
                        messageToTg += ` ${entry.join(" : ")}\n`;
                        console.log(messageToTg);
                    }

            
                }
                return messageToTg;
            };

            sendMessage();
            axios.post(URI_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: messageToTg,
            });
        }

    };


    function formValidate(modalForm) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
         console.log(formReq);
        

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
        }
        return error;
    }

    function formAddError(input) {
        input.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.classList.remove('_error');
        input.classList.remove('_error');
    }


    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});
 







function onModalFormBtnClick(event) {
    console.log('qqqq');
    refs.backdrop.classList.toggle('is-hiden');

    refs.backdrop.addEventListener('click', onBackdropClick);
    refs.modalCloseBtn.addEventListener('click', (onModalCloseBtnClick));

    refs.clientName.textContent = `Dear ${refs.modalInput[0].value},`;
    window.addEventListener('keydown', onEscKeyPress);
    // refs.modalFormBtn.removeEventListener('click', (onModalFormBtnClick));
}

function onModalCloseBtnClick(event) {
    window.removeEventListener('keydown', onEscKeyPress);
    refs.backdrop.removeEventListener('click', onBackdropClick);

    refs.modalCloseBtn.removeEventListener('click', (onModalCloseBtnClick));
    refs.modalCloseBtn.removeEventListener('click', (onModalCloseBtnClick));
    refs.backdrop.classList.toggle('is-hiden');

}
function onBackdropClick(event) {

    if (event.target === event.currentTarget) {

        onModalCloseBtnClick();
    }
};

function onEscKeyPress(event) {   
    
    if (event.code==="Escape") {
        onModalCloseBtnClick();
    }
    
}







