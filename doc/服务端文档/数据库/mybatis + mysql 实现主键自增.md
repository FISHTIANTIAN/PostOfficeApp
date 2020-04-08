## 1.mybitis xml配置
<insert id="insert" parameterType="student" keyProperty="studentId" useGeneratedKeys="true">

keyProperty 是Java对象的属性
useGeneratedKeys 取值范围true|false 默认值是：false。 
含义：设置是否使用JDBC的getGenereatedKeys方法获取主键并赋值到keyProperty设置的领域模型属性中。


## 2.主键必须设置自增
第一次插入的时候必须要在mysql数据库里执行一下主键自增的语句，才能如愿以偿的新增成功。
alter table student modify studnet_id integer auto_increment;
student 是表名，student_id 是主键。


## 3.mysql设置ID增值起始值
alter table student AUTO_INCREMENT=1