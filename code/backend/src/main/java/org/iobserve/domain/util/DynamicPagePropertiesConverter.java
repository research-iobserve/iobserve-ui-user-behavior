package org.iobserve.domain.util;

import org.iobserve.domain.Page;
import org.iobserve.util.DynamicPropertiesConverter;

public class DynamicPagePropertiesConverter extends DynamicPropertiesConverter {
    public DynamicPagePropertiesConverter() {
        super(Page.class);
    }
}
