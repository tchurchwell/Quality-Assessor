package com.qaitdevlabs.qualityassessor.dao.impl;

import java.util.List;

import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.qaitdevlabs.qualityassessor.dao.UserDao;
import com.qaitdevlabs.qualityassessor.model.User;

/**
 * 
 * @author anujchhabra
 * 
 */
public class UserDaoImpl extends GenericDaoImpl<User, Long> implements UserDao {

	protected MessageSourceAccessor messages;

	public UserDaoImpl() {
		super(User.class);
		messages = SpringSecurityMessageSource.getAccessor();

	}

	/**
	 * @see com.UserDao.net.security.domain.dao.CustomUserDAO#getCustomUserByUserName(java.lang.String)
	 */
	@SuppressWarnings("deprecation")
	public User getCustomUserByUserName(String userName)
			throws UsernameNotFoundException, DataAccessException {
		System.out.println(userName);
		@SuppressWarnings("unchecked")
		List<User> list = getHibernateTemplate().find(
				"from User c where c.username=?", userName);
		System.out.println(list);
		if (list.size() != 0) {
			return (User) list.get(0);
		} else {
			throw new UsernameNotFoundException(messages.getMessage(
					"JdbcDaoImpl.notFound", new Object[] { userName },
					"Username {0} not found"), userName);
		}

	}

	

	@Override
	public User saveUser(User user) {
		if (log.isDebugEnabled()) {
			log.debug("user's id: " + user.getUserId());
		}
		Session session = null;
		Transaction transaction = null;
		try {
			 session = getSessionFactory().openSession();
			 transaction = session.beginTransaction();
			 session.saveOrUpdate(user);
			 transaction.commit();
		} catch (Exception e) {
			transaction.rollback();
			e.printStackTrace();
		} finally {
			session.flush();
			session.close();
		}
		return user;
	}

	@Override
	public User validateUser(User user) {
		Session session = null;
		User savedUser = null;
		try {
 			 session = getSessionFactory().openSession();
			 String queryString = "from User where username = :username and password =:password";
			 Query query = session.createQuery(queryString);
			 query.setString("username", user.getUsername());
			 query.setString("password", user.getPassword());
			 savedUser = (User) query.uniqueResult();			
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return savedUser;		
	}

	@Override
	public User findUserWithProperty(String property, String value) {
		Session session = null;
		User savedUser = null;
		try {
 			 session = getSessionFactory().openSession();
			 String queryString = "from User where "+ property +" = :value";
			 Query query = session.createQuery(queryString);
			 query.setString("value", value);
			 savedUser = (User) query.uniqueResult();			
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return savedUser;		
	
	}

	@Override
	public User getUser(Long userId , boolean lazyLoad) {
		Session session = null;
		User savedUser = null;
		try {
 			 session = getSessionFactory().openSession();
 			 savedUser = (User)session.get(User.class, userId);
 			 if(!lazyLoad) {
// 				Hibernate.initialize(savedUser.getAddress());
 			 }
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return savedUser;				
	}
	
}