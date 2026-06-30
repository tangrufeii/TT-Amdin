package com.tt.common.utils;

import org.junit.jupiter.api.Test;

import java.io.File;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class VersionUtilTest {

    @Test
    void compareVersionShouldUseNumericSegments() {
        assertTrue(VersionUtil.compareVersion("1.0.10", "1.0.8") > 0);
        assertTrue(VersionUtil.compareVersion("1.1.0", "1.0.12") > 0);
        assertEquals(0, VersionUtil.compareVersion("v1.0.0", "1.0"));
        assertTrue(VersionUtil.compareVersion("1.0.0-beta", "1.0.0") == 0);
    }

    @Test
    void extractUpdateSqlTargetVersionShouldSupportTargetAndRangeNames() {
        assertEquals("1.0.8", VersionUtil.extractUpdateSqlTargetVersion("update-1.0.8.sql"));
        assertEquals("1.0.8", VersionUtil.extractUpdateSqlTargetVersion("update-1.0.4-1.0.8.sql"));
        assertEquals("v1.0.8", VersionUtil.extractUpdateSqlTargetVersion("update-1.0.4-v1.0.8.sql"));
        assertEquals("2026-06-10", VersionUtil.extractUpdateSqlTargetVersion("update-2026-06-10.sql"));
    }

    @Test
    void isWithinVersionRangeShouldUseTargetVersion() {
        assertTrue(VersionUtil.isWithinVersionRange(new File("update-1.0.8.sql"), "1.0.4", "1.1.8"));
        assertTrue(VersionUtil.isWithinVersionRange(new File("update-1.0.4-1.0.8.sql"), "1.0.4", "1.1.8"));
        assertFalse(VersionUtil.isWithinVersionRange(new File("update-1.0.4.sql"), "1.0.4", "1.1.8"));
        assertFalse(VersionUtil.isWithinVersionRange(new File("update-1.2.0.sql"), "1.0.4", "1.1.8"));
    }
}
