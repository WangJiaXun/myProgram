package goodsServlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(value="/test")
public class Servlet2 extends HttpServlet{
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(req, resp);
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
	
		Calendar c=Calendar.getInstance();
		Date date=c.getTime();
		SimpleDateFormat sdf=new SimpleDateFormat("HH:m"+" "+"yyyy-mm-dd");
		String str=sdf.format(date)+" "+req.getRemoteAddr();
	//	String d=date.getHours()+":"+date.getMinutes()+" "+date.getYear()+"-";
		
		System.out.println(str);
	}
}
