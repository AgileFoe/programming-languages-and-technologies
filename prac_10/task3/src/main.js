import { formal, simple, casual } from './modules/greetings.js'; 

const result = document.querySelector('#result'); 

document.querySelector('#say').addEventListener('click', () => { 
    const name = document.querySelector('#name').value.trim(); 
    const type = document.querySelector('#type').value;

    if (!name) {
        result.textContent = 'Введите имя!';
        return;
    }

    if (type === "formal") {
        result.textContent = formal(name);
    } else if (type === "simple") {
        result.textContent = simple(name);
    } else {
        result.textContent = casual(name);
    }
});