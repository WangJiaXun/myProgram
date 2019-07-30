package dao;

import java.util.List;

import entity.Emp;

public interface EmpDao {
	public List<Emp> getAllEmpByDeptNO(int id);
	public String getJobById(int id);
}
