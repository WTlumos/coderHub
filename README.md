# 登录token采用非对称加密

使用openssl来生成一对私钥和公钥

```bash

 openssl
> genrsa -out private.key 1024
> rsa -in private.key -pubout -out public.key
```

生成的 private.key 和 public.key 放入 /src/app/keys 中

# 【.env】文件

根目录下新建该文件，放入以下值

APP_HOST = 
APP_PORT = 

DATABASE_HOST = 
DATABASE_PORT = 
DATABASE_USER = 
DATABASE_PASSWORD = 
DATABASE = 

# 图片上传

根目录下新建 uploads 文件

uploads 中新建 avatar，picture 文件夹