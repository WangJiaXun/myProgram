package entity;

public class Dept {
	private int deptNo;
	private String dName;
	public int getDeptNo() {
		return deptNo;
	}
	public void setDeptNo(int deptNo) {
		this.deptNo = deptNo;
	}
	public String getdName() {
		return dName;
	}
	public Dept(){
		
	}
	public Dept(int deptNo, String dName) {
		super();
		this.deptNo = deptNo;
		this.dName = dName;
	}
	public void Dept(){
		
	}
	public void setdName(String dName) {
		this.dName = dName;
	}
}
