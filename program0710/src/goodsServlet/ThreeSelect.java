package goodsServlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import dao.DeptDao;
import dao.EmpDao;
import dao.impl.DeptDaoImp;
import dao.impl.EmpDaoImp;
import entity.Dept;
import entity.Emp;

@WebServlet(value="/EmpServlet")
public class ThreeSelect extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String op;
		EmpDao ed=new EmpDaoImp();
		DeptDao d=new DeptDaoImp();
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("text/html;charset=utf-8");

		if(req.getParameter("op")==null){
			op="getAllDept";
		}else{
			op=req.getParameter("op");
		}
		
		if(op.equals("getAllDept")){
			List<Dept> allDept = d.getAllDept();
			req.setAttribute("allDept", allDept);
			req.getRequestDispatcher("test.jsp").forward(req, resp);
			return;
		}
		if(op.equals("getAllEmp")){
			int id	=Integer.parseInt(req.getParameter("id"));
			List<Emp> emps=ed.getAllEmpByDeptNO(id);
			Emp emp=new Emp();
			for(int i=0;i<emps.size();i++){
				 emp=emps.get(i);
				 resp.getWriter().print(emp.getEmpno()+"."+emp.getEname()+"|");
			}
			return;
		}
		if(op.equals("getJobById")){
			int id	=Integer.parseInt(req.getParameter("id"));
			 String job = ed.getJobById(id);
			resp.getWriter().print(job);
			 return;
		}
	}
}
