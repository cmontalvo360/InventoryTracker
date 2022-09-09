package com.genspark.InventoryTracker.Entity;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name="authorities")
public class Role implements GrantedAuthority {
    private static final long serialVersionUID = -652088182797362903L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String authority;
    private String name;

    public Role() {}
    public Role(String authority) {
        this.authority = authority;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return authority;
    }
}
