$(() => {
    let layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#fileAvater').click((e) => {
        $('#avater_input').click();
        $('#avater_input').change(e => {
            let filelist = e.target.files;
            if (filelist.length === 0) {
                return layer.msg('请输入照片');
            }
            // 拿到文件
            let file = e.target.files[0];
            // 将文件转化成URL地址
            let newImgURL = URL.createObjectURL(file);
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域

            $('#btn_avater').click(() => {
                var dataURL = $image
                    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                        width: 100,
                        height: 100
                    })
                    .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
                $.ajax({
                    method: 'POST',
                    url: '/my/update/avatar',
                    data: {
                        avatar: dataURL
                    },
                    success: res => {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg(res.message);
                        window.parent.getUserInfo();
                    }
                })
            })

        })
    })
})