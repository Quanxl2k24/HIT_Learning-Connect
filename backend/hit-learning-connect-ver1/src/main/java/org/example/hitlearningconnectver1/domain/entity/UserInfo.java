package org.example.hitlearningconnectver1.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.checkerframework.common.aliasing.qual.Unique;


@Table(name = "user_info")
@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserInfo {
    @Id
    @Column(name = "user_id")
    Long id;

    @Column(name = "fullname", length = 100)
    String fullname;

    @Column(name = "phone", length = 15)
    String phone;

    @Column(name = "avatar")
    String avatar;

    @Column(name = "address", length = 500)
    String address;

    @Column(name = "position", length = 500)
    String position;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    User user;
}
