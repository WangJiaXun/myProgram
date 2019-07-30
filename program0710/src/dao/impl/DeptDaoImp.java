package dao.impl;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import dao.DeptDao;
import dbutil.JDBCUtils;
import entity.Dept;

public class DeptDaoImp implements DeptDao{

	@Override
	public List<Dept> getAllDept() {
		// TODO Auto-generated method stub
		JDBCUtils db=new JDBCUtils();
		Connection conn= db.getConnection();
		 try {
			 Statement	st=conn.createStatement();
			 ResultSet rs=st.executeQuery("select * from DEPT");
			 Dept dept=new Dept();
			 List<Dept> list=new ArrayList<Dept>();
			 while(rs.next()){
				 dept=new Dept();
				 dept.setDeptNo(rs.getInt("deptno"));
				 dept.setdName(rs.getString("dname"));
				 list.add(dept);
			 }
			 return list;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
}
