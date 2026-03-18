const userList = [
  {
    id: 1001,
    name: "张三",
    phone: 19655182346,
    dept: "软件开发部"
  },

  {
    id: 1002,
    name: "李四",
    phone: 13999185368,
    dept: "供水科技部"
  },

  {
    id: 1003,
    name: "王五",
    phone: 15755719965,
    dept: "供水服务部"
  },

  {
    id: 1004,
    name: "赵六",
    phone: 15622589542,
    dept: "人力资源部"
  },

  {
    id: 1005,
    name: "孟七八",
    phone: 13675984415,
    dept: "大禹算法部"
  },

  {
    id: 1006,
    name: "顾九",
    phone: 18933742568,
    dept: "采购管理部"
  }
]

const userTableBody = document.querySelector('.user-table-body');
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

// 搜索功能
function handleSearch() {
  const keyword = searchInput.value.trim().toLowerCase();
  currentPage = 1;
  if (keyword === "") {
    renderUserList(userList);
  } else {
    const filteredUserList = userList.filter(function (user) {
      const nameMatch = user.name.toLowerCase().includes(keyword);
      const phoneMatch = user.phone.toString().includes(keyword);
      return nameMatch || phoneMatch;
    })
    renderUserList(filteredUserList);
  }
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    handleSearch();
  }
})


const pageSize = 5;
let currentPage = 1;
let totalPages = 0;
let currentRenderData = [];

// 计算总页数
function calculateTotalPages(data) {
  totalPages = Math.ceil(data.length / pageSize);
}

// 定义当前页数据
function getCurrentPageData(data) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  return data.slice(startIndex, endIndex);
}

// 渲染用户列表
function renderUserList(data) {
  userTableBody.innerHTML = "";
  currentRenderData = [...data];
  calculateTotalPages(data);
  const currentPageData = getCurrentPageData(data);

  currentPageData.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.phone}</td>
    <td>${user.dept}</td>
    <td>
    <button class="edit-btn" data-id="${user.id}">编辑</button>
    <button class="delete-btn" data-id="${user.id}">删除</button>
    </td>
    `;
    const editBtn = tr.querySelector('.edit-btn');
    const deleteBtn = tr.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
      const targetUser = userList.find(item => item.id === user.id);
      showModal(targetUser);
    });

    deleteBtn.addEventListener('click', () => {
      if (confirm(`确定要删除用户【${user.name}】吗？`)) {
        const index = userList.findIndex(item => item.id === user.id);
        if (index > -1) {
          userList.splice(index, 1);
          // 重新渲染列表（保留搜索状态）
          handleSearch();
        }
      }
    });
    userTableBody.appendChild(tr);
  });

  renderPagination();
}

// 分页控件渲染
const paginationContainer = document.querySelector('.pagination-container');
function renderPagination() {
  paginationContainer.innerHTML = "";

  // 上一页按钮
  const prevBtn = document.createElement('button');
  prevBtn.textContent = "上一页";
  prevBtn.className = "page-btn";
  prevBtn.addEventListener('click', () => {
    if (currentPage <= 1) return;
    currentPage--;
    renderUserList(currentRenderData);
  });
  prevBtn.disabled = totalPages === 1 || currentPage === 1;
  paginationContainer.appendChild(prevBtn);

  // 2. 页码按钮
  for (let i = 1; i <= totalPages; i++) {
    // 总页数≤3时显示所有页码；总页数>3时显示首页、尾页、当前页±1
    const shouldShow = totalPages <= 3
      ? true
      : (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1));

    if (shouldShow) {
      const pageNumBtn = document.createElement('button');
      pageNumBtn.textContent = i;
      pageNumBtn.className = "page-btn";
      // 选中样式
      if (i === currentPage) {
        pageNumBtn.style.backgroundColor = "#409eff";
        pageNumBtn.style.color = "#fff";
        pageNumBtn.style.borderColor = "#409eff";
      }
      pageNumBtn.addEventListener('click', () => {
        currentPage = i;
        renderUserList(currentRenderData);
      });
      paginationContainer.appendChild(pageNumBtn);
    }
  }

  // 下一页按钮
  const nextBtn = document.createElement('button');
  nextBtn.textContent = "下一页";
  nextBtn.className = "page-btn";
  nextBtn.addEventListener('click', () => {
    if (currentPage >= totalPages) return;
    currentPage++;
    renderUserList(currentRenderData);
  });
  nextBtn.disabled = totalPages === 1 || currentPage === totalPages;
  paginationContainer.appendChild(nextBtn);
}





// 弹窗功能
const modalMask = document.querySelector('.modal-mask');
const nameInput = document.querySelector('.name-input');
const phoneInput = document.querySelector('.phone-input');
const deptInput = document.querySelector('.dept-input');
const confirmBtn = document.querySelector('.confirm-btn');
const cancelBtn = document.querySelector('.cancel-btn');
let currentEditId = null;   // 记录当前编辑用户的ID

function showModal(user) {
  modalMask.style.display = 'flex';
  currentEditId = user.id;
  nameInput.value = user.name;
  phoneInput.value = user.phone;
  deptInput.value = user.dept;
}

function hideModal() {
  modalMask.style.display = 'none';
  currentEditId = null;
  nameInput.value = '';
  phoneInput.value = '';
  deptInput.value = '';
}

// 确认编辑按钮事件
confirmBtn.addEventListener('click', () => {
  // 更新用户数据
  const targetIndex = userList.findIndex(item => item.id === currentEditId);
  if (targetIndex > -1) {
    userList[targetIndex] = {
      ...userList[targetIndex],
      name: nameInput.value.trim(),
      phone: Number(phoneInput.value.trim()),
      dept: deptInput.value.trim()
    };
    handleSearch();
    hideModal();
  }
});

// 取消按钮
cancelBtn.addEventListener('click', hideModal);

// 点击遮罩层关闭弹窗
modalMask.addEventListener('click', (e) => {
  if (e.target === modalMask) {
    hideModal();
  }
});

renderUserList(userList);
