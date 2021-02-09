$(() => {
    // 获取用户信息
    let layer = layui.layer
    getUserInfo()
        // 退出功能
    $('#quit').on('click', () => {
        layer.confirm('是否确定退出', { icon: 3, title: '提示' }, function(index) {
            // 要清空本地存储
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })




})

// 这种定义方法所有作用域都可以使用
// 想要通过外部window.parent调用必须定义在最外面
function getUserInfo() {
    // 发起Ajax请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 渲染用户头像以及名字
            console.log(res);

            renderUserInfo(res.data)
        },
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空本地存储
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderUserInfo(user) {
    // 渲染头像
    // 获取名字
    let userName = user.nickname || user.username
        // 如果没有头像
    if (user.user_pic == null) {
        $('.text-avater').show().html(userName[0].toUpperCase())
        $('#welcome').html('欢迎&nbsp;&nbsp;' + userName)
        $('.layui-nav-img').hide()
    } else {
        $('.layui-nav-img').show()
        $('#welcome').html('欢迎&nbsp;&nbsp;' + userName)
        $('.text-avater').hide()
    }
}