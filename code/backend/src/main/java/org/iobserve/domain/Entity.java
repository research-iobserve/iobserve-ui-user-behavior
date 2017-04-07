package org.iobserve.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.voodoodyne.jackson.jsog.JSOGGenerator;

/**
 * Base class for all models
 *
 * @author Daniel Banck
 */
@JsonIdentityInfo(generator = JSOGGenerator.class)
public abstract class Entity {

    private Long id;

    public void setId(final Long id) {
        this.id = id;
    }

    public Long getId() {
        return this.id;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == null || this.id == null || this.getClass() != o.getClass()) {
            return false;
        }

        final Entity entity = (Entity) o;

        if (!this.id.equals(entity.id)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return this.id == null ? -1 : this.id.hashCode();
    }
}