package com.qaitdevlabs.qualityassessor.productTemplateMap.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qaitdevlabs.qualityassessor.model.ProductTemplateMap;
import com.qaitdevlabs.qualityassessor.productTemplateMap.dao.ProductTemplateMapDao;
import com.qaitdevlabs.qualityassessor.productTemplateMap.service.ProductTemplateMapService;

@Service
public class ProductTemplateMapServiceImpl implements ProductTemplateMapService{

	private ProductTemplateMapDao productTemplateMapDao;
	
	@Autowired
	public void setProductTemplateMapDao(ProductTemplateMapDao productTemplateMapDao){
		this.productTemplateMapDao = productTemplateMapDao;
	}
	
	@Override
	public void saveOrUpdateProductTemplateMap(
			ProductTemplateMap productTemplateMap) {
		 productTemplateMapDao.saveOrUpdateProductTemplateMap(productTemplateMap);
		
	}

	@Override
	public List<ProductTemplateMap> getProductsToBeReviewed() {
		return productTemplateMapDao.getProductsToBeReviewed();
	
	}

}