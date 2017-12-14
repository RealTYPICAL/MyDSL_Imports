package org.xtext.example.mydsl.generator

import org.eclipse.emf.ecore.resource.ResourceSet
import org.eclipse.emf.common.util.URI

class MyDslLib {
	
	public val static LIB = "mydsl/lang/Core.mydsl"
	
	def loadLib(ResourceSet resourceSet) {
		val url = getClass().getClassLoader().getResource(LIB)
		val stream = url.openStream
		val resource = resourceSet.createResource(URI.createFileURI(url.path))
		resource.load(stream, resourceSet.loadOptions)
	}
	
}
