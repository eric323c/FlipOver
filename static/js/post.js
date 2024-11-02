document.getElementById('file-input').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('uploaded-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('next-button').addEventListener('click', function () {
    document.querySelector('.modal-step-1').style.display = 'none';
    document.querySelector('.modal-step-2').style.display = 'block';
});

