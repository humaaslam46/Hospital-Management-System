const doctors=[
{name:'Dr John Smith',dept:'Cardiology',img:'https://randomuser.me/api/portraits/men/11.jpg',desc:'Heart specialist with 10 years experience'},
{name:'Dr Emma Brown',dept:'Neurology',img:'https://randomuser.me/api/portraits/women/12.jpg',desc:'Expert neurologist'},
{name:'Dr Alex Lee',dept:'Orthopedics',img:'https://randomuser.me/api/portraits/men/13.jpg',desc:'Bone & joint surgeon'},
{name:'Dr Mia Clark',dept:'Pediatrics',img:'https://randomuser.me/api/portraits/women/14.jpg',desc:'Child care specialist'},
];

document.querySelectorAll('[data-page]').forEach(link=>{
link.onclick=()=>{
document.querySelectorAll('.page').forEach(p=>p.classList.add('d-none'));
document.getElementById(link.dataset.page).classList.remove('d-none');
}
});

/* THEME */
document.getElementById('themeToggle').onclick=()=>{
document.body.dataset.theme=document.body.dataset.theme==='light'?'dark':'light';
};

/* DEPARTMENTS */
const depts=[...new Set(doctors.map(d=>d.dept))];
const deptCards=document.getElementById('deptCards');

depts.forEach(d=>{
deptCards.innerHTML+=`
<div class="col-md-3">
<div class="card dept-card p-3 text-center">${d}</div>
</div>`;
});

document.querySelectorAll('.dept-card').forEach(card=>{
card.onclick=()=>{
document.getElementById('deptDoctors').classList.remove('d-none');
document.getElementById('deptTitle').innerText=card.innerText;
const list=document.getElementById('deptDoctorList');
list.innerHTML='';
doctors.filter(x=>x.dept===card.innerText).forEach(d=>{
list.innerHTML+=`
<div class="col-md-3">
<div class="card doctor-card p-3 text-center">
<img src="${d.img}" class="img-fluid rounded mb-2">
<h6>${d.name}</h6>
</div>
</div>`;
});
};
});

/* DOCTORS PAGE */
const docCards=document.getElementById('doctorCards');
doctors.forEach(d=>{
docCards.innerHTML+=`
<div class="col-md-3">
<div class="card doctor-card p-3 text-center">
<img src="${d.img}" class="img-fluid rounded mb-2">
<h6>${d.name}</h6>
<small>${d.dept}</small>
</div>
</div>`;
});

/* DOCTOR DETAIL */
document.addEventListener('click',e=>{
if(e.target.closest('.doctor-card')){
const name=e.target.closest('.doctor-card').querySelector('h6').innerText;
const d=doctors.find(x=>x.name===name);
document.querySelectorAll('.page').forEach(p=>p.classList.add('d-none'));
document.getElementById('doctorDetail').classList.remove('d-none');
docImg.src=d.img;
docName.innerText=d.name;
docDept.innerText=d.dept;
docDesc.innerText=d.desc;
}
});

doctorBack.onclick=()=>{
document.querySelectorAll('.page').forEach(p=>p.classList.add('d-none'));
document.getElementById('doctors').classList.remove('d-none');
};
