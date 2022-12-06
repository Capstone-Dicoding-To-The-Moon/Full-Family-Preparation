# How to run

1. npm install
2. npx prisma db push
3. npx prisma generate
4. npm run start

# API Dokumentasi
Repository yang berisi tentang kebutuhan untuk implementasi API dari aplikasi.

_src\plugins\routes\routesAdmin.js_

### **Admin**
#### GET

```http
  GET /admin
```

| Arguments | Output             |
| :-------- | :------------------|
| `()`      | Semua daftar admin |


```http
  GET /admin/{id}
```

| Arguments | Type     | Output                            |
| :-------- | :------- | :-------------------------------- |
| `()`      | `string` | Semua daftar admin berdasarkan ID |


```http
  GET /admin/image/{name}
```

| Arguments | Type     | Output                     |
| :-------- | :------- | :--------------------------|
| `()`      | `string` | Foto profile dari ID admin |


#### PUT

```http
  PUT /admin
```

| Arguments | Type     | Output                        |
| :-------- | :------- | :-----------------------------|
| `name`    | `string` | Admin berhasil diubah datanya |
| `email`   | `string` | Admin berhasil diubah datanya |
| `oldImage`| `string` | Admin berhasil diubah datanya |
| `newImage`| `files`  | Admin berhasil diubah datanya |
| `role`    | `string` | Admin berhasil diubah datanya |


#### DELETE

```http
  DELETE /admin
```

| Arguments | Type     | Output                 |
| :-------- | :------- | :----------------------|
| `email`   | `string` | Admin berhasil dihapus |
| `role`    | `string` | Admin berhasil dihapus |


#### POST

```http
  POST /admin
```

| Arguments | Type     | Output                |
| :-------- | :------- | :---------------------|
| `name`    | `string` | Admin berhasil dibuat |
| `email`   | `string` | Admin berhasil dibuat |
| `image`   | `files`  | Admin berhasil dibuat |
| `role`    | `string` | Admin berhasil dibuat |


### **Forum**
#### GET

```http
  GET /forum
```

| Arguments | Output           |
| :-------- | :----------------|
| `()`      | Semua data forum |


```http
  GET /forum/{id}
```

| Arguments | Type     | Output                            |
| :-------- | :------- | :-------------------------------- |
| `()`      | `string` | Semua daftar forum berdasarkan ID |


```http
  GET /forumDates
```

| Arguments | Output                              |
| :-------- | :-----------------------------------|
| `()`      | Semua data forum berdasarkan tanggal|

```http
  GET /forumCat/{id}
```

| Arguments | Type     | Output                                 |
| :-------- | :------- | :--------------------------------------|
| `()`      | `string` | Semua daftar forum berdasarkan kategori|


```http
  GET /forumDis/{id}
```

| Arguments | Type     | Output                                |
| :-------- | :------- | :-------------------------------------|
| `()`      | `string` | Semua daftar forum berdasarkan diskusi|


#### PUT
```http
  PUT /forum
```

| Arguments | Type     | Output                        |
| :-------- | :------- | :-----------------------------|
| `id`      | `string` | Forum berhasil diubah datanya |
| `tittle`  | `string` | Forum berhasil diubah datanya |
| `authorId`| `string` | Forum berhasil diubah datanya |
| `oldImage`| `string` | Forum berhasil diubah datanya |
| `newImage`| `files`  | Forum berhasil diubah datanya |


```http
  PUT /forumUpVote
```

| Arguments | Type     | Output                   |
| :-------- | :------- | :------------------------|
| `()`      | `string` | Memperbarui up vote forum|


```http
  PUT /forumDownVote
```

| Arguments | Type     | Output                   |
| :-------- | :------- | :------------------------|
| `()`      | `string` | Memperbarui up vote forum|


#### DELETE
```http
  DELETE /forum
```

| Arguments | Type     | Output                |
| :-------- | :------- | :---------------------|
| `()`      | `string` | Forum berhasil dihapus|


#### POST
```http
  POST /forum
```

| Arguments | Type     | Output                        |
| :-------- | :------- | :-----------------------------|
| `tittle`  | `string` | Forum berhasil diubah datanya |
| `authorId`| `string` | Forum berhasil diubah datanya |
| `image`   | `string` | Forum berhasil diubah datanya |


### **Kategori**
#### GET

```http
  GET /categories
```

| Arguments | Output               |
| :-------- | :--------------------|
| `()`      | Semua daftar kategori|


```http
  GET /categories/{id}
```

| Arguments | Type     | Output                               |
| :-------- | :------- | :------------------------------------|
| `()`      | `string` | Semua daftar kategori berdasarkan ID |


#### PUT
```http
  PUT /categories
```

| Arguments | Type     | Output                           |
| :-------- | :------- | :--------------------------------|
| `name`    | `string` | Kategori berhasil diubah datanya |
| `tittle`  | `string` | Kategori berhasil diubah datanya |


#### DELETE
```http
  DELETE /categories
```

| Arguments | Type     | Output                   |
| :-------- | :------- | :------------------------|
| `()`      | `string` | Kategori berhasil dihapus|


#### POST
```http
  POST /categories
```

| Arguments | Type     | Output                  |
| :-------- | :------- | :-----------------------|
| `tittle`  | `string` | Kategori berhasil dibuat|
| `authorId`| `string` | Kategori berhasil dibuat|
| `updateBy`| `string` | Kategori berhasil dibuat|


### **Kategori Forum**
#### GET

```http
  GET /kategori_forum
```

| Arguments | Output                     |
| :-------- | :--------------------------|
| `()`      | Semua daftar kategori forum|


```http
  GET /kategori_forum/{id}
```

| Arguments | Type     | Output                                     |
| :-------- | :------- | :------------------------------------------|
| `()`      | `string` | Semua daftar kategori forum berdasarkan ID |


#### POST
```http
  POST /kategori_forum
```

| Arguments   | Type     | Output                        |
| :-----------| :------- | :-----------------------------|
| `forumId`   | `string` | Kategori forum berhasil dibuat|
| `kategoriId`| `string` | Kategori forum berhasil dibuat|


### **Kategori Post**
#### GET

```http
  GET /kategori_post
```

| Arguments | Output                    |
| :-------- | :-------------------------|
| `()`      | Semua daftar kategori post|


```http
  GET /kategori_post/{id}
```

| Arguments | Type     | Output                                    |
| :-------- | :------- | :-----------------------------------------|
| `()`      | `string` | Semua daftar kategori post berdasarkan ID |


#### POST
```http
  POST /kategori_post
```

| Arguments   | Type     | Output                       |
| :-----------| :------- | :----------------------------|
| `postId`    | `string` | Kategori post berhasil dibuat|
| `kategoriId`| `string` | Kategori post berhasil dibuat|


### **Komentar Forum**
#### GET

```http
  GET /komentar_forum
```

| Arguments | Output                     |
| :-------- | :--------------------------|
| `()`      | Semua daftar komentar forum|


```http
  GET /komentar_forum/{id}
```

| Arguments | Type     | Output                                     |
| :-------- | :------- | :------------------------------------------|
| `()`      | `string` | Semua daftar komentar forum berdasarkan ID |

#### PUT
```http
  PUT /komentar_forum
```

| Arguments   | Type     | Output                        |
| :-----------| :------- | :-----------------------------|
| `content`   | `string` | Komentar forum berhasil dibuat|


#### DELETE
```http
  DELETE /komentar_forum
```

| Arguments | Type     | Output                          |
| :-------- | :------- | :-------------------------------|
| `()`      | `string` | Komentar forum berhasil dihapus |


#### POST
```http
  POST /komentar_forum
```

| Arguments | Type     | Output                              |
| :-------- | :------- | :-----------------------------------|
| `content` | `string` | Komentar forum berhasil ditambahkan |
| `authorId`| `string` | Komentar forum berhasil ditambahkan |
| `forumId` | `string` | Komentar forum berhasil ditambahkan |


### **Komentar Post**
#### GET

```http
  GET /komentar_post
```

| Arguments | Output                  |
| :-------- | :-----------------------|
| `()`      | Data berhasil didapatkan|


```http
  GET /komentar_post/{id}
```

| Arguments | Type     | Output                                  |
| :-------- | :------- | :---------------------------------------|
| `()`      | `string` | Data berhasil didapatkan berdasarkan ID |

#### PUT
```http
  PUT /komentar_post
```

| Arguments   | Type     | Output                       |
| :-----------| :------- | :----------------------------|
| `content`   | `string` | Komentar post berhasil dibuat|


#### DELETE
```http
  DELETE /komentar_post
```

| Arguments | Type     | Output                         |
| :-------- | :------- | :------------------------------|
| `()`      | `string` | Komentar post berhasil dihapus |


#### POST
```http
  POST /komentar_post
```

| Arguments | Type     | Output                              |
| :-------- | :------- | :-----------------------------------|
| `content` | `string` | Komentar forum berhasil ditambahkan |
| `authorId`| `string` | Komentar forum berhasil ditambahkan |
| `forumId` | `string` | Komentar forum berhasil ditambahkan |


### **Log**
#### GET

```http
  GET /log
```

| Arguments | Output          |
| :-------- | :---------------|
| `()`      | Semua daftar log|


### **Post**
#### GET

```http
  GET /posts
```

| Arguments | Output           |
| :-------- | :----------------|
| `()`      | Semua daftar post|


```http
  GET /posts/{id}
```

| Arguments | Type     | Output                           |
| :-------- | :------- | :--------------------------------|
| `()`      | `string` | Semua daftar post berdasarkan ID |


```http
  GET /postsDates
```
| Arguments | Output                               |
| :-------- | :------------------------------------|
| `()`      | Semua daftar post berdasarkan tanggal|


```http
  GET /postsCat/{id}
```
| Arguments | Output                                |
| :-------- | :-------------------------------------|
| `()`      | Semua daftar post berdasarkan kategori|


```http
  GET /postsCom/{id}
```
| Arguments | Type     | Output                                        |
| :-------- | :------- | :---------------------------------------------|
| `()`      | `string` | Semua daftar post berdasarkan komentar dari ID|

#### PUT 
```http
  PUT /postsCat
```

| Arguments | Type     | Output                        |
| :-------- | :------- | :-----------------------------|
| `id`      | `string` | Berhasil memperbarui data post|
| `tittle`  | `string` | Berhasil memperbarui data post|
| `content` | `string` | Berhasil memperbarui data post|
| `authorId`| `string` | Berhasil memperbarui data post|
| `oldImage`| `string` | Berhasil memperbarui data post|
| `newImage`| `files`  | Berhasil memperbarui data post|


```http
  PUT /postsUpVote
```

| Arguments | Type     | Output                           |
| :-------- | :------- | :--------------------------------|
| `()`      | `string` | Berhasil memperbarui up vote post|


```http
  PUT /postsDownVote
```

| Arguments | Type     | Output                             |
| :-------- | :------- | :----------------------------------|
| `()`      | `string` | Berhasil memperbarui down vote post|


#### DELETE
```http
  DELETE /posts
```

| Arguments | Type     | Output                      |
| :-------- | :------- | :---------------------------|
| `()`      | `string` | Berhasil menghapus data post|


#### POST
```http
  POST /posts
```

| Arguments | Type     | Output                   |
| :-------- | :------- | :------------------------|
| `tittle`  | `string` | Post berhasil ditambahkan|
| `content` | `string` | Post berhasil ditambahkan|
| `image`   | `files`  | Post berhasil ditambahkan|
| `authorId`| `string` | Post berhasil ditambahkan|


### **Role**
#### GET

```http
  GET /roles
```

| Arguments | Output           |
| :-------- | :----------------|
| `()`      | Semua daftar role|


```http
  GET /roles/{id}
```

| Arguments | Type     | Output                           |
| :-------- | :------- | :--------------------------------|
| `()`      | `string` | Semua daftar role berdasarkan ID |


#### POST
```http
  POST /roles
```

| Arguments | Type     | Output                    |
| :-------- | :------- | :-------------------------|
| `role`    | `string` | Role berhasil ditambahkan |


### **User**
#### GET
```http
  GET /user
```

| Arguments | Output           |
| :-------- | :----------------|
| `()`      | Semua daftar user|


```http
  GET /user/{id}
```

| Arguments | Type     | Output                           |
| :-------- | :------- | :--------------------------------|
| `()`      | `string` | Semua daftar user berdasarkan ID |


```http
  GET /user/image/{name}
```

| Arguments | Type     | Output                     |
| :-------- | :------- | :--------------------------|
| `name`    | `file`   | Berhasil mendapatkan image |


#### PUT
```http
  PUT /user
```

| Arguments | Type     | Output                  |
| :-------- | :------- | :-----------------------|
| `name`    | `string` | User berhasil diperbarui|
| `email`   | `string` | User berhasil diperbarui|
| `oldImage`| `string` | User berhasil diperbarui|
| `newImage`| `files`  | User berhasil diperbarui|


#### DELETE
```http
  DELETE /user
```

| Arguments | Type     | Output                      |
| :-------- | :------- | :---------------------------|
| `email`   | `string` | Berhasil menghapus data user|


#### POST
```http
  POST /user
```

| Arguments | Type     | Output                   |
| :-------- | :------- | :------------------------|
| `name`    | `string` | User berhasil ditambahkan|
| `email`   | `string` | User berhasil ditambahkan|
| `image`   | `files`  | User berhasil ditambahkan|
