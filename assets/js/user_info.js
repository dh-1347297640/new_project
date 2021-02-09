$(function() {
    let form = layui.form;
    let layer = layui.layer;
    // 表单规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '输入1-6个字符';
            }
        }
    })

    // 表单赋值
    initUserInfo();
    // 上传用户信息请求头部中一定要加id
    $('#formUser').submit(e => {
        console.log($('#formUser').serialize());

        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('#formUser').serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('请求失败');
                }
                console.log(res);
                layer.msg('成功填写基本资料')
                window.parent.getUserInfo();
            }
        })
    })


    function initUserInfo() {
        // 发起ajax请求
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function(res) {
                if (res.status !== 0) {
                    return '请求失败';
                }
                // 快速赋值
                form.val("formTest", res.data)
                $('#reset').click(function(e) {
                    e.preventDefault();
                    form.val("formTest", res.data)
                })
            }
        })
    }
})