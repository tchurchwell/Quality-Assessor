package com.qaitdevlabs.qualityassessor.web;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.qaitdevlabs.qualityassessor.domain.service.DomainService;
import com.qaitdevlabs.qualityassessor.dto.TreeNodeDTO;
import com.qaitdevlabs.qualityassessor.model.User;

/**
 * This is a home controller class
 * 
 * @author anujchhabra
 * 
 */
@Controller
public class HomeController {

	private DomainService domainService;

	@Autowired
	public void setDomainService(DomainService domainService) {
		this.domainService = domainService;
	}

	/**
	 * This method redirects home url to home page of application
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(ModelMap model, HttpServletRequest request) {
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		User user = (User) auth.getPrincipal();
		Long userId = user.getUserId();
		request.getSession().setAttribute("USER_ID", userId);
		return "home";
	}

	/**
	 * This method is used to get list of child domains corresponding to parent
	 * key
	 * 
	 * @param key
	 *            parent key
	 * @return list of child domains
	 */
	@RequestMapping(value = "/domains")
	public @ResponseBody
	List<TreeNodeDTO> getDomainList(@RequestParam String key) {
		List<TreeNodeDTO> list = domainService.getDomainList(key);
		return list;
	}
}
