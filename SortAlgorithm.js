function Search(){
    const searchInput = document.getElementById('search').value;
    if (searchInput === 'Interchange Sort'){
        InterchangeSort();
    }
    else if (searchInput === 'Quick Sort'){
        QuickSort();
    }
    else if (searchInput === 'Merge Sort'){
        MergeSort();
    }
    else if (searchInput === 'Heap Sort'){
        HeapSort();
    }
    else if (searchInput === 'Selection Sort'){
        SelectionSort();
    }
    else if (searchInput === 'Insertion Sort'){
        InsertionSort();
    }
    else if (searchInput === 'Bubble Sort'){
        BubbleSort();
    }
    else if (searchInput === 'Radix Sort'){
        RadixSort();
    }
    else if (searchInput === 'Shell Sort'){
        ShellSort();
    }
}

function Swap(index1, index2) {
    return new Promise((resolve) => {
        const buttons = document.getElementsByClassName('ArrayElement');
        const button1 = buttons[index1];
        const button2 = buttons[index2];

        button1.classList.add('fade-out');
        button2.classList.add('fade-out');

        const swapSound = document.getElementById('swapSound');
        swapSound.play();

        setTimeout(() => {
            const temp = button1.textContent;
            button1.textContent = button2.textContent;
            button2.textContent = temp;

            button1.classList.remove('fade-out');
            button2.classList.remove('fade-out');

            button1.classList.add('fade-in');
            button2.classList.add('fade-in');

            setTimeout(() => {
                button1.classList.remove('fade-in');
                button2.classList.remove('fade-in');
                resolve(); // Kết thúc Promise khi quá trình hoán đổi hoàn tất
            }, 700);
        }, 700);
    });
}

async function BubbleSort() {
    const item = document.getElementById('bubble-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const numButtons = buttons.length;

    for (let i = 0; i < numButtons; i++) {
        for (let j = 0; j < numButtons - i - 1; j++) {
            if (Number(buttons[j].textContent) > Number(buttons[j + 1].textContent)) {
                // Chờ Swap hoàn thành trước khi tiếp tục
                await Swap(j, j + 1);
            }
        }
    }
    item.classList.remove('active');
}

async function SelectionSort() {
    const item = document.getElementById('selection-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const numButtons = buttons.length;

    for (let i = 0; i < numButtons - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < numButtons; j++) {
            if (Number(buttons[j].textContent) < Number(buttons[minIndex].textContent)) {
                minIndex = j;
            }
        }
        if (minIndex !== i){
            await Swap(i, minIndex);
        }
    }
    item.classList.remove('active');
}

async function RadixSort() {
    const item = document.getElementById('radix-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const maxDigits = await MaxDigits();

    // Sắp xếp từng chữ số từ thấp đến cao
    for (let i = maxDigits - 1; i >= 0; i--) {
        await SortSupport(i, maxDigits);
    }
    item.classList.remove('active');
}

// Hàm tìm số lượng chữ số lớn nhất trong mảng
async function MaxDigits() {
    const buttons = document.getElementsByClassName('ArrayElement');
    let maxDigits = 0;
    for (let i = 0; i < buttons.length; i++) {
        const digitCount = buttons[i].textContent.length;
        if (digitCount > maxDigits) {
            maxDigits = digitCount;
        }
    }
    return maxDigits;
}

// Hàm hỗ trợ sắp xếp dựa trên chữ số tại vị trí index
async function SortSupport(index, maxDigits) {
    const buttons = document.getElementsByClassName('ArrayElement');
    const numButtons = buttons.length;

    // Chèn theo từng chữ số tại vị trí index
    for (let i = 1; i < numButtons; i++) {
        const currentValue = getDigitValue(buttons[i].textContent, index, maxDigits);
        let j = i - 1;

        // Tìm vị trí để chèn phần tử hiện tại vào
        while (j >= 0 && getDigitValue(buttons[j].textContent, index, maxDigits) > currentValue) {
            // Di chuyển phần tử lớn hơn về phía sau
            await Swap(j, j + 1);
            j--;
        }
    }
}

// Hàm lấy giá trị chữ số tại vị trí index (hoặc trả về 0 nếu không có)
function getDigitValue(text, index, maxDigits) {
    // Tính vị trí chữ số từ phải sang trái
    const adjustedIndex = index - (maxDigits - text.length);

    if (adjustedIndex < 0) return 0; // Không có chữ số ở vị trí này
    return Number(text[adjustedIndex]);
}


async function InsertionSort() {
    const item = document.getElementById('insertion-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const numButtons = buttons.length;

    for (let i = 1; i < numButtons; i++) {
        let currentValue = Number(buttons[i].textContent);
        let j = i - 1;

        // Tìm vị trí để chèn phần tử hiện tại vào
        while (j >= 0 && Number(buttons[j].textContent) > currentValue) {
            // Di chuyển phần tử lớn hơn về phía sau
            await Swap(j, j + 1);
            j--;
        }
    }
    item.classList.remove('active');
}

async function ShellSort() {
    const item = document.getElementById('shell-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const numButtons = buttons.length;

    // Chọn giá trị gap ban đầu (thường là số phần tử / 2)
    let gap = Math.floor(numButtons / 2);

    // Giảm dần gap cho đến khi nó bằng 1
    while (gap >= 1) {
        // Sử dụng insertion sort cho mỗi gap
        for (let i = gap; i < numButtons; i++) {
            let currentValue = Number(buttons[i].textContent);
            let j = i;

            // So sánh và di chuyển phần tử với khoảng cách gap
            while (j >= gap && Number(buttons[j - gap].textContent) > currentValue) {
                await Swap(j - gap, j); // Hoán đổi các phần tử
                j -= gap;
            }
        }

        // Giảm gap theo một cách thông thường (chia đôi)
        gap = Math.floor(gap / 2);
    }
    item.classList.remove('active');
}

async function InterchangeSort() {
    const item = document.getElementById('int-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const numButtons = buttons.length;

    // Duyệt qua tất cả các cặp phần tử
    for (let i = 0; i < numButtons; i++) {
        for (let j = i + 1; j < numButtons; j++) {
            // Nếu phần tử tại vị trí i lớn hơn phần tử tại vị trí j, hoán đổi chúng
            if (Number(buttons[i].textContent) > Number(buttons[j].textContent)) {
                await Swap(i, j);
            }
        }
    }
    item.classList.remove('active');
}

async function QuickSort() {
    const item = document.getElementById('quick-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const numButtons = buttons.length;
    await quickSortRecursive(buttons, 0, numButtons - 1);
    item.classList.remove('active');
}

async function quickSortRecursive(buttons, low, high) {
    if (low < high) {
        // Chia mảng thành hai phần và lấy chỉ số của pivot sau khi phân chia
        const pi = await partition(buttons, low, high);

        // Đệ quy sắp xếp hai phần mảng
        await quickSortRecursive(buttons, low, pi - 1);
        await quickSortRecursive(buttons, pi + 1, high);
    }
}

async function partition(buttons, low, high) {
    const pivot = Number(buttons[high].textContent);  // Chọn phần tử cuối làm pivot
    let i = low - 1;  // Chỉ số của phần tử nhỏ hơn pivot

    // Duyệt qua mảng và phân chia các phần tử vào hai nhóm
    for (let j = low; j < high; j++) {
        if (Number(buttons[j].textContent) <= pivot) {
            i++;
            await Swap(i, j);  // Hoán đổi phần tử nhỏ hơn pivot
        }
    }

    // Đưa pivot vào vị trí chính xác
    await Swap(i + 1, high);
    return i + 1;  // Trả về chỉ số của pivot
}

async function HeapSort() {
    const item = document.getElementById('heap-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const numButtons = buttons.length;

    // Xây dựng max heap
    for (let i = Math.floor(numButtons / 2) - 1; i >= 0; i--) {
        await Heapify(buttons, numButtons, i);
    }

    // Sắp xếp
    for (let i = numButtons - 1; i > 0; i--) {
        // Hoán đổi phần tử gốc (lớn nhất) với phần tử cuối
        await Swap(0, i);
        // Tái cấu trúc heap
        await Heapify(buttons, i, 0);
    }
    item.classList.remove('active');
}

async function Heapify(buttons, n, i) {
    let largest = i; // Khởi tạo largest là gốc
    const left = 2 * i + 1; // Chỉ số con trái
    const right = 2 * i + 2; // Chỉ số con phải

    // Nếu con trái lớn hơn gốc
    if (left < n && Number(buttons[left].textContent) > Number(buttons[largest].textContent)) {
        largest = left;
    }

    // Nếu con phải lớn hơn gốc hoặc con trái
    if (right < n && Number(buttons[right].textContent) > Number(buttons[largest].textContent)) {
        largest = right;
    }

    // Nếu largest không phải là gốc, hoán đổi và tiếp tục Heapify
    if (largest !== i) {
        await Swap(i, largest);
        await Heapify(buttons, n, largest);
    }
}

async function MergeSort() {
    const item = document.getElementById('merge-item');
    item.classList.add('active');
    const buttons = document.getElementsByClassName('ArrayElement');
    const arr = Array.from(buttons).map(button => Number(button.textContent));
    
    // Gọi hàm merge sort với hiệu ứng biến mất và xuất hiện
    await mergeSortWithEffect(arr, 0, arr.length - 1, buttons);
    item.classList.remove('active');
}

// Hàm Merge Sort với hiệu ứng
async function mergeSortWithEffect(arr, left, right, buttons) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    // Chia đôi mảng
    await mergeSortWithEffect(arr, left, mid, buttons);
    await mergeSortWithEffect(arr, mid + 1, right, buttons);

    // Gộp hai nửa và áp dụng hiệu ứng
    await mergeWithEffect(arr, left, mid, right, buttons);
}

// Hàm Merge với hiệu ứng
async function mergeWithEffect(arr, left, mid, right, buttons) {
    // Tạo các mảng tạm thời để lưu các phần tử của hai nửa
    const leftArray = arr.slice(left, mid + 1);
    const rightArray = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    // Hiệu ứng biến mất các phần tử trong khoảng từ left đến right
    for (let idx = left; idx <= right; idx++) {
        buttons[idx].classList.add('fade-out');
    }
    const swapSound = document.getElementById('swapSound');
    swapSound.play();
    // Chờ để các phần tử biến mất hoàn toàn
    await new Promise(resolve => setTimeout(resolve, 700));

    // Sắp xếp lại các phần tử trong mảng chính
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    // Sao chép phần còn lại của leftArray
    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    // Sao chép phần còn lại của rightArray
    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }

    // Cập nhật lại nội dung của các nút và hiển thị chúng trở lại
    for (let idx = left; idx <= right; idx++) {
        buttons[idx].textContent = arr[idx];
        buttons[idx].classList.remove('fade-out');
        buttons[idx].classList.add('fade-in');
    }

    
    // Chờ để các phần tử xuất hiện hoàn toàn
    await new Promise(resolve => setTimeout(resolve, 700));

    // Loại bỏ lớp fade-in để các phần tử trở về trạng thái bình thường
    for (let idx = left; idx <= right; idx++) {
        buttons[idx].classList.remove('fade-in');
    }
}
