document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    let isMenuOpen = false;

    hamburger?.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.padding = '1rem';
        } else {
            nav.style.display = 'none';
        }

        // ハンバーガーアイコンのアニメーション
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = isMenuOpen ? '0' : '1';
        spans[2].style.transform = isMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : '';
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // モバイルメニューが開いている場合は閉じる
                if (isMenuOpen) {
                    hamburger.click();
                }

                window.scrollTo({
                    top: target.offsetTop - 80, // ヘッダーの高さを考慮
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // セクションに対してアニメーションを適用
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});
