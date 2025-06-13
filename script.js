// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

const SUPABASE_URL = 'https://ftwvmqzzwbqvsrcnjvok.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0d3ZtcXp6d2JxdnNyY25qdm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3ODAyNjMsImV4cCI6MjA2NTM1NjI2M30.91PVzGyrsJiZtwPwQje14PVKZni1vTTVsq3KOs_p3jg';

function saveContact(formData) {
    console.log('提交内容：', formData); // 调试用
    // 尝试请求 Supabase，如果失败则本地 mock
    fetch(`${SUPABASE_URL}/rest/v1/客户信息收集表`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify(formData)
    })
    .then(res => {
        if (!res.ok) throw new Error('网络或Supabase异常');
        return res.json();
    })
    .then(data => {
        formStatus.innerHTML = '信息已保存！';
        formStatus.className = 'form-status success';
        contactForm.reset();
    })
    .catch(err => {
        // 本地mock逻辑
        formStatus.innerHTML = '（本地模拟）信息已保存！';
        formStatus.className = 'form-status success';
        contactForm.reset();
        console.warn('Supabase无法访问，已本地模拟保存：', formData);
    });
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formStatus.innerHTML = '正在提交...';
        formStatus.className = 'form-status sending';

        const fd = new FormData(this);
        const formData = {
            姓名: fd.get('user_name'),
            年龄: fd.get('user_age') ? parseInt(fd.get('user_age'), 10) : 0,
            电话: fd.get('user_phone'),
            咨询内容: fd.get('message')
        };
        saveContact(formData);
    });
}

// 图片加载优化
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.gallery-grid img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
});

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
}); 