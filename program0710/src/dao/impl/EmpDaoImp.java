package dao.impl;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import dao.EmpDao;
import dbutil.JDBCUtils;
import entity.Dept;
import entity.Emp;

public class EmpDaoImp implements EmpDao{

	@Override
	public List<Emp> getAllEmpByDeptNO(int id){
		JDBCUtils db=new JDBCUtils();
		Connection conn= db.getConnection();
		 try {
			 String sql="select * from emp where deptno="+id;
			 Statement	st=conn.createStatement();
			 ResultSet rs=st.executeQuery(sql);
			 Emp emp=new Emp();
			 List<Emp> list=new ArrayList<Emp>();
			 while(rs.next()){
				 emp=new Emp();
				 emp.setDeptno(rs.getInt("deptno"));
				 emp.setEmpno(rs.getInt("empno"));
				 emp.setEname(rs.getString("ename"));
				 list.add(emp);
			 }
			 return list;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public String getJobById(int id) {
		JDBCUtils db=new JDBCUtils();
		Connection conn= db.getConnection();
		 try {
			 String sql="select * from emp where empno="+id;
			 Statement	st=conn.createStatement();
			 ResultSet rs=st.executeQuery(sql);
			 String job="";
			 if(rs.next()){
				 job=rs.getString("job");
			 }
			 return job;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "";
	}

}
