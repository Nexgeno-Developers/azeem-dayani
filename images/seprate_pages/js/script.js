const faqs = document.querySelectorAll('.faq');
        const searchInput = document.getElementById('search');
        faqs.forEach(faq => {
            faq.addEventListener("click",()=>{
                faq.classList.toggle("active")
            })
        })
        searchInput.addEventListener("keyup",function (event){
            let searchString = event.target.value.toLowerCase();
            faqs.forEach(item => {
                item.querySelector('.question-text').textContent.toLowerCase().includes(searchString) || item.querySelector('.answer-text').textContent.toLowerCase().includes(searchString) ? (item.style.display = "") : item.style.display = 'none';
            })
        })