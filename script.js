// --- ส่วนจัดการข้อมูล (Data Handling) ---
var safeJobsData = []; 

if (typeof jobsData === 'undefined') {
    console.error("Error: ไม่พบข้อมูล jobsData กรุณาตรวจสอบว่าไฟล์ jobs.js ถูกโหลดแล้วหรือไม่");
} else {
    safeJobsData = jobsData;
    // เติมข้อมูล Default กัน Error
    safeJobsData.forEach(function(job) {
        if(!job.long_desc) job.long_desc = job.desc || "ไม่มีรายละเอียด";
        if(!job.responsibilities) job.responsibilities = ["วางแผนงาน", "ประสานงาน"];
        if(!job.education) job.education = "ปริญญาตรี หรือมีประสบการณ์";
        if(!job.icon) job.icon = "fa-solid fa-briefcase"; 
    });
}

// --- ฟังก์ชันช่วยสร้าง HTML (Helper Function) ---
// ฟังก์ชันนี้มีหน้าที่ "วาดการ์ด" อย่างเดียว เพื่อให้ทั้ง Search และ Filter เรียกใช้ได้
function drawJobsToContainer(jobsList) {
    var container = document.getElementById('job-container');
    if (!container) return;
    
    container.innerHTML = ''; // ล้างข้อมูลเก่า

    if (jobsList.length === 0) {
        container.innerHTML = '<div class="col-span-full text-center text-white py-10 opacity-80"><i class="fa-solid fa-face-frown-open text-4xl mb-3"></i><br>ไม่พบอาชีพที่ค้นหา</div>';
        return;
    }

    jobsList.forEach(function(job, index) {
        var delay = index * 50;
        var iconClass = job.icon || "fa-solid fa-briefcase";
        
        var cardHTML = `
            <div class="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 flex flex-col h-full cursor-pointer relative overflow-hidden group hover:-translate-y-2 hover:shadow-2xl transition duration-300 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                 style="animation-delay: ${delay}ms;"
                 onclick="openModal(${job.id})">
                
                <div class="absolute top-0 right-0 w-16 h-16 bg-theme-50 rounded-bl-3xl -mr-2 -mt-2 transition-colors group-hover:bg-theme-100 flex items-center justify-center text-theme-300 group-hover:text-theme-500">
                     <i class="${iconClass} text-2xl"></i>
                </div>

                <div class="mb-4">
                    <span class="text-xs font-bold text-theme-600 bg-theme-50 px-3 py-1 rounded-full border border-theme-100">
                        ${job.category}
                    </span>
                </div>

                <h3 class="text-xl font-bold text-slate-800 mb-2 group-hover:text-theme-600 transition line-clamp-2 pr-8">${job.title}</h3>
                <p class="text-slate-500 text-sm line-clamp-2 mb-4 h-10">${job.desc}</p>
                
                <div class="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div>
                        <p class="text-xs text-slate-400">เงินเดือนเฉลี่ย</p>
                        <p class="text-sm font-bold text-theme-600">${job.salary}</p>
                    </div>
                    <div class="text-slate-300 group-hover:translate-x-1 transition text-sm flex items-center gap-1 group-hover:text-theme-500">
                        ดูข้อมูล <i class="fa-solid fa-chevron-right text-xs"></i>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}


// --- ส่วนฟังก์ชันค้นหา (Search Logic) --- 
window.searchJobs = function() {
    var input = document.getElementById('search-input');
    var filterText = input.value.toLowerCase().trim(); // แปลงเป็นตัวพิมพ์เล็กและตัดช่องว่าง
    
    // รีเซ็ตปุ่มหมวดหมู่ให้ดูเหมือนไม่ได้เลือก (Optional)
    var buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(function(btn) {
        btn.className = 'filter-btn bg-white text-slate-600 border border-slate-200 px-6 py-2 rounded-full transition cursor-pointer hover:bg-theme-50 hover:text-theme-600';
    });

    // กรองข้อมูล
    var filtered = safeJobsData.filter(function(job) {
        // ค้นหาใน ชื่ออาชีพ, คำอธิบาย, หรือ หมวดหมู่
        var matchTitle = job.title.toLowerCase().includes(filterText);
        var matchDesc = job.desc.toLowerCase().includes(filterText);
        var matchCat = job.category.toLowerCase().includes(filterText);
        
        // ค้นหาใน Skills (Array)
        var matchSkill = job.skills && job.skills.some(function(skill) {
            return skill.toLowerCase().includes(filterText);
        });

        return matchTitle || matchDesc || matchCat || matchSkill;
    });

    // วาดผลลัพธ์
    drawJobsToContainer(filtered);
};


// --- ส่วนแสดงผลตามหมวดหมู่ (Category Filter) ---
window.renderJobs = function(filter) {
    if (!filter) filter = 'all';

    // ล้างช่องค้นหาเมื่อกดปุ่มหมวดหมู่
    var searchInput = document.getElementById('search-input');
    if(searchInput) searchInput.value = '';

    // กรองข้อมูล
    var filteredJobs = (filter === 'all') 
        ? safeJobsData 
        : safeJobsData.filter(function(job) { return job.category.includes(filter); });

    // วาดผลลัพธ์
    drawJobsToContainer(filteredJobs);
};

window.filterJobs = function(category) {
    // จัดการปุ่มกด (Highlight ปุ่มที่เลือก)
    var buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(function(btn) {
        btn.className = 'filter-btn bg-white text-slate-600 border border-slate-200 px-6 py-2 rounded-full transition cursor-pointer hover:bg-theme-50 hover:text-theme-600';
        
        if ((category === 'all' && btn.innerText === 'ทั้งหมด') || 
            (category !== 'all' && btn.innerText.includes(category))) {
            btn.className = 'filter-btn active bg-theme-600 text-white shadow-md px-6 py-2 rounded-full transition cursor-pointer hover:shadow-lg transform hover:-translate-y-0.5 border border-transparent';
        }
    });

    renderJobs(category);
};


// --- ส่วน Navigation & Modal (คงเดิม) ---
window.showPage = function(pageId) {
    var sections = document.querySelectorAll('.page-section');
    sections.forEach(function(section) {
        section.classList.remove('active');
        section.style.display = 'none';
        section.style.opacity = '0';
    });

    var target = document.getElementById(pageId);
    if (target) {
        target.style.display = (pageId === 'home') ? 'flex' : 'block';
        setTimeout(function() {
            target.classList.add('active');
            target.style.opacity = '1';
        }, 10);
    }

    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.toggleMobileMenu = function() {
    var menu = document.getElementById('mobile-menu');
    if(menu) menu.classList.toggle('hidden');
};

window.openModal = function(id) {
    var job = safeJobsData.find(function(j) { return j.id === id; });
    if (!job) return;

    function setText(elemId, text) {
        var el = document.getElementById(elemId);
        if(el) el.innerText = text || '-';
    }

    setText('modal-category', job.category);
    setText('modal-title', job.title);
    setText('modal-salary', job.salary);
    setText('modal-mode', job.mode);
    setText('modal-growth', job.growth);
    setText('modal-education', job.education);
    setText('modal-long-desc', job.long_desc);

    var iconEl = document.getElementById('modal-icon');
    if (iconEl) {
        iconEl.className = job.icon || "fa-regular fa-id-badge";
    }

    var respEl = document.getElementById('modal-responsibilities');
    if(respEl) {
        respEl.innerHTML = (job.responsibilities || []).map(function(r) { 
            return `<li class="flex items-start gap-3 text-slate-600 text-sm md:text-base">
                <i class="fa-solid fa-check-circle text-theme-500 mt-1 shrink-0"></i>
                <span>${r}</span>
            </li>`;
        }).join('');
    }

    var skillEl = document.getElementById('modal-skills');
    if(skillEl) {
        skillEl.innerHTML = (job.skills || []).map(function(s) { 
            return `<span class="bg-pink-50 text-pink-700 text-xs px-3 py-1.5 rounded-lg font-bold border border-pink-100 shadow-sm">${s}</span>`;
        }).join('');
    }

    var toolEl = document.getElementById('modal-tools');
    if(toolEl) {
        toolEl.innerHTML = (job.tools || []).map(function(t) { 
            return `<span class="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg font-medium border border-slate-200">${t}</span>`;
        }).join('');
    }

    var modal = document.getElementById('job-modal');
    var content = document.getElementById('modal-content');
    
    if(modal) {
        modal.classList.remove('invisible', 'opacity-0');
        modal.classList.add('visible', 'opacity-100');
    }
    if(content) {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    var modal = document.getElementById('job-modal');
    var content = document.getElementById('modal-content');

    if(modal) {
        modal.classList.remove('visible', 'opacity-100');
        modal.classList.add('invisible', 'opacity-0');
    }
    if(content) {
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
    }
    document.body.style.overflow = 'auto';
};

window.onclick = function(event) {
    var modal = document.getElementById('job-modal');
    if (event.target === modal) {
        closeModal();
    }
};

// --- Typing Effect ---
var words = ["ปัญญาประดิษฐ์ (AI)", "เทคโนโลยีเปลี่ยนโลก", "อาชีพในฝันของคุณ", "ความมั่นคงยุคใหม่"];
var i = 0;
var j = 0;
var isDeleting = false;

function typeWriter() {
    var element = document.getElementById('typing-text');
    if(!element) return;
    
    var currentWord = words[i];
    
    if (isDeleting) {
        element.innerHTML = currentWord.substring(0, j--);
        if (j < 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            j = 0;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, 50);
        }
    } else {
        element.innerHTML = currentWord.substring(0, j++);
        if (j > currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else {
            setTimeout(typeWriter, 100);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Website Loaded with Search Logic");
    renderJobs(); // เริ่มต้นแสดงข้อมูลทั้งหมด
    typeWriter();
    showPage('home');
});