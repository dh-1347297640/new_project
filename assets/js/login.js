$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    var myform = layui.form
    var layer = layui.layer
    myform.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var val = $(".reg-box [name=password]").val()
            if (val !== value) {
                return '确认密码失败'
            }
        }
    })

    // 监听表单提交事件
    $('#form_reg').on('submit', function(e) {
            let sendData = {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }
            e.preventDefault()
            $.post('http://api-breakingnews-web.itheima.net/api/reguser', sendData, function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('注册成功')
                })
                // 返回登陆页面
            $('#link_login').click()
        })
        //监听登陆表单提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
            //不是查询字符串格式也可以发送
            // 因为要转成键值对格式
        console.log($('#form_login').serialize());
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            data: $('#form_login').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登路成功')
                location.href = '/index.html'
                    // 将获得的token存储在本地存储
                localStorage.setItem('token', res.token)
            }
        })

    })
})