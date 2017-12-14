package com.tool.small.mydsl.myDsl

import org.eclipse.xtext.naming.QualifiedName
import org.eclipse.xtext.scoping.impl.ImportNormalizer
import org.eclipse.xtext.scoping.impl.ImportedNamespaceAwareLocalScopeProvider

class Import extends ImportedNamespaceAwareLocalScopeProvider {

	override protected getImplicitImports(boolean ignoreCase) {
		newArrayList(new ImportNormalizer(
			QualifiedName.create("mydsl", "lang", "Core"),
			true,
			ignoreCase
		));
	}

}
