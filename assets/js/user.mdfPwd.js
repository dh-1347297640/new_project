$(() => {
    let form = layui.form;
    let layer = layui.layer;
    // 制订密码框规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            newpwd: function(value) {
                if (value === $('[name=oldPwd]').val()) {
                    return '新旧密码不能相同';
                }
            }
        })
        //修改密码
    $('#form_pwd').submit(e => {
        console.log($('form_pwd').serialize());

        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('#form_pwd').serialize(),
            success: res => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
            }
        })
    })
})