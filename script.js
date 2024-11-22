function generateInputFields() {
    const numElements = document.getElementById('numElements').value;
    const inputContainer = document.getElementById('inputContainer');
    inputContainer.innerHTML = ''; // Xóa các input cũ nếu có

    for (let i = 0; i < numElements; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'elementInput';
        input.placeholder = `Ele ${i + 1}`;
        inputContainer.appendChild(input);
    }
    // Hiển thị nút CREATE
    document.getElementById('generateDivs').style.display = 'inline-block';
}

function generateDivs() {
    const elementInputs = document.getElementsByClassName('elementInput');
    const buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.innerHTML = ''; // Xóa các nút cũ nếu có

    for (let input of elementInputs) {
        const value = input.value;
        if (value !== '') {
            const div = document.createElement('div');
            div.textContent = value;
            div.className = 'ArrayElement';
            div.classList.add('alert');
            div.classList.add('alert-success');
            buttonsContainer.appendChild(div);
        }
    }
}
