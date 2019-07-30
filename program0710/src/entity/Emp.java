package entity;

public class Emp {
	private int empno;
	private String ename;
	private String job;
	public Emp(int empno, String ename, String job, int deptno) {
		super();
		this.empno = empno;
		this.ename = ename;
		this.job = job;
		this.deptno = deptno;
	}
	public Emp() {
	
	}
	public int getEmpno() {
		return empno;
	}
	public void setEmpno(int empno) {
		this.empno = empno;
	}
	public String getEname() {
		return ename;
	}
	public void setEname(String ename) {
		this.ename = ename;
	}
	public String getJob() {
		return job;
	}
	public void setJob(String job) {
		this.job = job;
	}
	public int getDeptno() {
		return deptno;
	}
	public void setDeptno(int deptno) {
		this.deptno = deptno;
	}
	int deptno;

}
