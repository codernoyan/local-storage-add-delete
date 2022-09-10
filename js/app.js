const getInputFieldValueById = id => {
    const inputField = document.getElementById(id);
    const inputFieldValue = inputField.value.trim();
    inputField.value = '';
    return inputFieldValue;
}
const sendData = () => {
    // get user data
    const userEmail = getInputFieldValueById('user__email');
    const userPassword = getInputFieldValueById('user__password');
    // console.log(userEmail, userPassword);
    setDataToLocalStorage(userEmail, userPassword)
}

const getDataFromLocalStorage = () => {
    const userInfo = localStorage.getItem('user-info');
    const userInfoParsed = JSON.parse(userInfo);
    return userInfoParsed;
}

// object way
// const setDataToLocalStorage = (email, password) => {
//     let userInfo = getDataFromLocalStorage();
    
//     if (!userInfo) {
//         userInfo = {}
//     }

//     userInfo[email] = password;

//     localStorage.setItem('user-info', JSON.stringify(userInfo));
// }

// array of objects way
const setDataToLocalStorage = (email, password) => {
    const userData = [];
    const userInfo = getDataFromLocalStorage();

    if (!userInfo) {
        userData.push({
            email: email,
            password: password
        })
        localStorage.setItem('user-info', JSON.stringify(userData));
        displayInfo();
    } else {
        userData.push(
            ...userInfo,
            {
            email: email,
            password: password
            })
        localStorage.setItem('user-info', JSON.stringify(userData));
        displayInfo();
    }
}

const displayInfo = () => {
    const allUserInfo = getDataFromLocalStorage();
    // console.log(allUserInfo)
    // const userInfoContainer = ('#user__info__container');
    const userInfoContainer = document.getElementById('user__info__container');
    userInfoContainer.textContent = '';
    allUserInfo.forEach(user => {
        // console.table(user)
        const div = document.createElement('div');
        div.classList.add('mb-4')
        div.innerHTML = `
            <div class="flex items-center justify-between p-4 text-green-700 border rounded border-green-900/10 bg-green-50"
                role="alert">
                <strong class="text-sm font-medium">${user.email}</strong>
                <strong class="text-sm font-medium">${user.password}</strong>

                <button onclick="deleteItem('${user.email}')" class="opacity-90" type="button">
                    <span class="sr-only"> Close </span>

                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        `;
        userInfoContainer.appendChild(div);
    })
}

displayInfo();

const deleteItem = item => {
    const infos = getDataFromLocalStorage();
    const index = infos.map(i => i.email).indexOf(item);
    console.log(index);
    infos.splice(index, 1);
    localStorage.setItem('user-info', JSON.stringify(infos));
    displayInfo();
}