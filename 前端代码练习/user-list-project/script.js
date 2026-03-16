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
  }
]

const userTableBody = document.querySelector('.user-table-body');

function renderUserList(data) {
  userTableBody.innerHTML = "";
  data.forEach(user => {
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


    });

    deleteBtn.addEventListener('click', () => {


    });
    userTableBody.appendChild(tr);
  });
}
renderUserList(userList);
